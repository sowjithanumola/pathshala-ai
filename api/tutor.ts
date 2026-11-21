type ApiRequest = { method?: string; headers: Record<string,string|string[]|undefined>; body?: unknown };
type ApiResponse = { status: (code:number)=>ApiResponse; json: (data:unknown)=>void; setHeader: (name:string,value:string)=>void };
declare const process: { env: Record<string,string|undefined> };

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(x=>x.trim()).filter(Boolean);

export default async function handler(req:ApiRequest,res:ApiResponse) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Use POST for tutor questions.'});}
  const origin=typeof req.headers.origin==='string'?req.headers.origin:'';
  if(allowedOrigins.length && origin && !allowedOrigins.includes(origin)) return res.status(403).json({error:'This website is not allowed to use the tutor.'});
  const apiKey=process.env.GEMINI_API_KEY;
  if(!apiKey) return res.status(503).json({error:'The live tutor is not configured yet. Add GEMINI_API_KEY to Vercel Environment Variables, then redeploy.'});
  const authorization=req.headers.authorization;
  const token=typeof authorization==='string'&&authorization.startsWith('Bearer ')?authorization.slice(7):'';
  if(!token) return res.status(401).json({error:'Please sign in before using the AI tutor.'});
  const firebaseKey=process.env.VITE_FIREBASE_API_KEY;
  if(!firebaseKey) return res.status(503).json({error:'Firebase verification is not configured on the server.'});
  try {
    const verify=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseKey)}`,{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:token})
    });
    if(!verify.ok) return res.status(401).json({error:'Your sign-in session has expired. Please sign in again.'});
    const account=await verify.json() as {users?:Array<{localId?:string}>};
    if(!account.users?.[0]?.localId) return res.status(401).json({error:'Please sign in to continue.'});
    const body=(typeof req.body==='string'?JSON.parse(req.body):req.body||{}) as {question?:string;language?:string;context?:Array<{title?:string;subject?:string;content?:string[]}>};
    const question=String(body.question||'').trim().slice(0,1800);
    if(!question) return res.status(400).json({error:'Write a question first.'});
    const language=String(body.language||'English').slice(0,40);
    const context=Array.isArray(body.context)?body.context.slice(0,12).map(item=>({
      title:String(item.title||'').slice(0,120),subject:String(item.subject||'').slice(0,80),
      content:Array.isArray(item.content)?item.content.slice(0,4).map(x=>String(x).slice(0,500)):[]
    })):[];
    const prompt=[
      'You are Pathshala, a patient, encouraging personal learning tutor for school students.',
      'Write naturally, like a thoughtful human teacher. Avoid robotic introductions, generic filler, excessive headings, and emojis.',
      'Explain accurately in clear age-appropriate language. Use short steps and a concrete example when useful. Never pretend to know a student personal detail.',
      `Answer in ${language}, unless the learner explicitly asks for another language.`,
      'Use the supplied lesson notes when relevant, but correct misconceptions gently. If a question is outside the notes, answer from general knowledge and say when you are unsure.',
      'Lesson notes: '+JSON.stringify(context),
      'Learner question: '+question
    ].join('\n\n');
    const gemini=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',{
      method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},
      body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{temperature:0.55,maxOutputTokens:900}})
    });
    const result=await gemini.json() as {candidates?:Array<{content?:{parts?:Array<{text?:string}>}}>;error?:{message?:string}};
    if(!gemini.ok) return res.status(502).json({error:result.error?.message||'The AI provider could not answer just now.'});
    const answer=result.candidates?.[0]?.content?.parts?.map(part=>part.text||'').join('\n').trim();
    if(!answer) return res.status(502).json({error:'The tutor returned an empty answer. Please try a shorter question.'});
    return res.status(200).json({answer});
  } catch {
    return res.status(500).json({error:'Something went wrong while preparing the explanation. Please try again.'});
  }
}
