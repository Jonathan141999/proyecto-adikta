CREATE TABLE IF NOT EXISTS public.formularios_contacto (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre_completo TEXT NOT NULL,
    email TEXT NOT NULL,
    asunto TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    estado TEXT DEFAULT 'pendiente',
    fecha_creacion TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.formularios_contacto ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable public inserts for contact form" 
ON public.formularios_contacto 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view submissions" 
ON public.formularios_contacto 
FOR SELECT 
TO authenticated 
USING (true);
