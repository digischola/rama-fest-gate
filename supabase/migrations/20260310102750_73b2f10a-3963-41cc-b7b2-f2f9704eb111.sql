-- Create registrations table (public, no auth required)
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  attendees INTEGER NOT NULL DEFAULT 1,
  volunteer BOOLEAN NOT NULL DEFAULT false,
  age INTEGER,
  gender TEXT,
  remarks TEXT,
  volunteering_categories TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration form, no auth)
CREATE POLICY "Anyone can register" ON public.registrations
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read registrations for count
CREATE POLICY "Anyone can read registrations" ON public.registrations
  FOR SELECT USING (true);

-- Function to get total attendee count
CREATE OR REPLACE FUNCTION public.get_registration_count()
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(attendees), 0)::INTEGER FROM public.registrations;
$$;