import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { SignupEmail } from '../_shared/email-templates/signup.tsx'
import { InviteEmail } from '../_shared/email-templates/invite.tsx'
import { MagicLinkEmail } from '../_shared/email-templates/magic-link.tsx'
import { RecoveryEmail } from '../_shared/email-templates/recovery.tsx'
import { EmailChangeEmail } from '../_shared/email-templates/email-change.tsx'
import { ReauthenticationEmail } from '../_shared/email-templates/reauthentication.tsx'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const EMAIL_SUBJECTS: Record<string, string> = {
  signup: 'Confirmez votre inscription sur Spacio',
  invite: 'Vous êtes invité(e) sur Spacio',
  magiclink: 'Votre lien de connexion Spacio',
  recovery: 'Réinitialisation de votre mot de passe Spacio',
  email_change: 'Confirmez votre nouvelle adresse email',
  reauthentication: 'Votre code de vérification',
}

const EMAIL_TEMPLATES: Record<string, React.ComponentType<any>> = {
  signup: SignupEmail,
  invite: InviteEmail,
  magiclink: MagicLinkEmail,
  recovery: RecoveryEmail,
  email_change: EmailChangeEmail,
  reauthentication: ReauthenticationEmail,
}

const SITE_NAME = 'Spacio'
const ROOT_DOMAIN = 'spacionantes.fr'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return new Response(
      JSON.stringify({ error: 'Email service not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const payload = await req.json()

    // Supabase Auth Hook payload format
    const emailType = payload.type || payload.email_data?.type
    const recipient = payload.email || payload.email_data?.email
    const confirmationUrl = payload.confirmation_url || payload.email_data?.confirmation_url || payload.email_data?.redirect_to
    const token = payload.token || payload.email_data?.token
    const newEmail = payload.new_email || payload.email_data?.new_email

    if (!emailType || !recipient) {
      console.error('Missing email type or recipient', { payload: JSON.stringify(payload) })
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Auth email request', { emailType, recipient })

    const EmailTemplate = EMAIL_TEMPLATES[emailType]
    if (!EmailTemplate) {
      console.error('Unknown email type', { emailType })
      return new Response(
        JSON.stringify({ error: `Unknown email type: ${emailType}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const templateProps = {
      siteName: SITE_NAME,
      siteUrl: `https://${ROOT_DOMAIN}`,
      recipient,
      confirmationUrl,
      token,
      email: recipient,
      newEmail,
    }

    const html = await renderAsync(React.createElement(EmailTemplate, templateProps))

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Spacio <contact@spacionantes.fr>`,
        to: [recipient],
        subject: EMAIL_SUBJECTS[emailType] || 'Notification Spacio',
        html,
      }),
    })

    const result = await res.json()

    if (!res.ok) {
      console.error('Resend API error:', res.status, JSON.stringify(result))
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Auth email sent successfully', { emailType, recipient })

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Auth email hook error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
