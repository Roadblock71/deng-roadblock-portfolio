import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  
  // Fetch the profile image URL directly from Supabase
  const res = await fetch(`${supabaseUrl}/rest/v1/site_config?key=eq.profile_image_url&select=value`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  })
  const data = await res.json()
  const profilePic = data[0]?.value || 'https://deng-roadblock-portfolio.vercel.app/images/logo.png'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '80px', fontWeight: 'bold', color: 'white', margin: 0, lineHeight: 1.1 }}>
            Deng Roadblock
          </h1>
          <p style={{ fontSize: '40px', color: '#FF6B00', marginTop: '20px', fontWeight: 'bold' }}>
            Software Developer
          </p>
          <p style={{ fontSize: '30px', color: '#a0a0a0', marginTop: '10px' }}>
            Building Practical Software.
          </p>
        </div>
        {profilePic && (
          <img 
            src={profilePic} 
            width="400" 
            height="400" 
            style={{ borderRadius: '50%', objectFit: 'cover', border: '8px solid #0066FF' }} 
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}