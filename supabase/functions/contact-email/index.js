import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
    try {
        const { record } = await req.json()

        const emailHtml = `
      <h1>Nuevo mensaje de contacto</h1>
      <p><strong>De:</strong> ${record.nombre_completo} (${record.email})</p>
      <p><strong>Asunto:</strong> ${record.asunto}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${record.mensaje}</p>
      <hr />
      <p><small>Enviado el: ${new Date(record.fecha_creacion).toLocaleString()}</small></p>
    `;

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'Adikt@ PC <onboarding@resend.dev>',
                to: ['informacion@adiktapc.net'],
                subject: `Nuevo contacto: ${record.asunto}`,
                html: emailHtml,
            }),
        })

        const data = await res.json()

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
            status: res.status,
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
