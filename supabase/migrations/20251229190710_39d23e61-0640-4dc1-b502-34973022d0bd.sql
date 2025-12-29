-- Update workflow phases with German titles/subtitles and remove estimated_time
UPDATE public.workflow_phases SET 
  title = 'Einführung',
  subtitle = 'Was ist StrichAbi und wie funktioniert der Workflow',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 1;

UPDATE public.workflow_phases SET 
  title = 'Konzept & Skript',
  subtitle = 'Skript so schreiben, dass die Visual-Logik stimmt',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 2;

UPDATE public.workflow_phases SET 
  title = 'Character Positioning',
  subtitle = 'Side-by-side, Closeup, No-characters – alle 3-7 Sekunden wechseln',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 3;

UPDATE public.workflow_phases SET 
  title = 'Canva Grundstruktur',
  subtitle = '100-150 Slides pro Design, früh genug neues Design öffnen',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 4;

UPDATE public.workflow_phases SET 
  title = 'Animation Prinzipien',
  subtitle = 'Jedes gesprochene Wort mit Sinn braucht eine Bewegung',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 5;

UPDATE public.workflow_phases SET 
  title = 'Export aus Canva',
  subtitle = 'Als ZIP exportieren, Slides richtig benennen und organisieren',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 6;

UPDATE public.workflow_phases SET 
  title = 'CapCut Assembly',
  subtitle = 'Alle Bilder importieren, Timeline auf 1-2 Min zusammenschieben',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 7;

UPDATE public.workflow_phases SET 
  title = 'Audio & Sounds',
  subtitle = 'Sync auf Audiospur, Sounds an wichtigen Stellen',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 8;

UPDATE public.workflow_phases SET 
  title = 'Finishing',
  subtitle = 'Captions, Compound Clip, Zooms für mehr Leben',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 9;

UPDATE public.workflow_phases SET 
  title = 'Export & Veröffentlichung',
  subtitle = 'Finale Export-Settings und Upload',
  estimated_time = NULL,
  difficulty = NULL
WHERE order_index = 10;