-- Create table to store Valentine responses
CREATE TABLE public.valentine_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  response TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow inserts from anyone since this is a proposal site)
ALTER TABLE public.valentine_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a response (no auth needed for this intimate site)
CREATE POLICY "Anyone can submit a response"
ON public.valentine_responses
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read responses (for the proposer to see)
CREATE POLICY "Anyone can read responses"
ON public.valentine_responses
FOR SELECT
USING (true);