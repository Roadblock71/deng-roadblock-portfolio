import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

export async function GET() {
  // Use the official client so Edge runtime handles it smoothly
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )

  const { data } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'profile_image_url')
    .single()

  const profilePic = data?.value || 'https://deng-roadblock-portfolio.vercel.app/images/logo.png'

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1 style={{ fontSize: '80px', fontWeight: 'bold', color: 'white', margin: 0, lineHeight: 1.1 }}>
            Deng Roadblock
          </h1>
          <p style={{ fontSize: '40px', color: '#FF6B00', margin: 0, fontWeight: 'bold' }}>
            Software Developer
          </p>
          <p style={{ fontSize: '30px', color: '#a0a0a0', margin: 0 }}>
            Building Practical Software.
          </p>
          {/* Call to Action to fix the OpenGraph warning */}
          <div style={{ marginTop: '20px', display: 'flex' }}>
            <span style={{ 
              fontSize: '24px', 
              color: 'white', 
              backgroundColor: '#0066FF', 
              padding: '12px 24px', 
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              View Portfolio →
            </span>
          </div>
        </div>
        
        {/* Wrap the image in a div so Satori crops it into a perfect circle */}
        {profilePic && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              border: '8px solid #0066FF',
              overflow: 'hidden',
            }}
          >
            <img
              src={profilePic}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}