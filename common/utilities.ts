import type { NextApiResponse } from 'next'

export const handleApiError = (res: NextApiResponse, error: any) => {
  if (typeof error == 'string') {
    return res.status(500).json({ error: error })
  } else if (error instanceof Error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
