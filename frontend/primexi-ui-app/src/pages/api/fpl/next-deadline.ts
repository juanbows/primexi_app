import type { NextApiRequest, NextApiResponse } from 'next';

type FplEvent = {
  id: number;
  deadline_time: string;
  is_next: boolean;
};

type FplBootstrap = {
  events: FplEvent[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/', {
      headers: {
        'User-Agent': 'PRIMEXI-Next',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream FPL error' });
    }

    const data = (await response.json()) as FplBootstrap;
    const now = Date.now();
    const nextEvent =
      data.events.find(event => event.is_next) ??
      data.events.find(event => new Date(event.deadline_time).getTime() > now);

    if (!nextEvent) {
      return res.status(404).json({ error: 'No upcoming deadline' });
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=300');
    return res.status(200).json({
      gameweek: nextEvent.id,
      deadlineTime: nextEvent.deadline_time,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load deadline' });
  }
}
