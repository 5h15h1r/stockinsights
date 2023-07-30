// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongoDB from "@/libs/db"
import Companies from "@/model/companies"
import formatDate from "@/helper/getTime";

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    await connectMongoDB()
    const { scripId, startDate, endDate, critical, recentAnnouncments } = req.query;
    const queryObject = {}

try {

  if (scripId){
    queryObject.SCRIP_CD = scripId.split(',');
  }

  if (startDate && endDate || recentAnnouncments){
    
    const start = new Date(startDate).toISOString()
    const end = new Date(endDate).toISOString()
    queryObject.NEWS_DT =  { $gte: start , $lte: end }
    console.log(new Date());
  }

  if (critical){
    queryObject.CRITICALNEWS=critical
  }

  const companies = await Companies.find(queryObject).sort({NEWS_DT :-1})
    res.status(200).json({  nhBits: companies.length, companies })
  
} catch (error) {
  console.error("error fetching", error)
  res.status(500).json({error:'Error fetching ANNOUNCEMENT'})
}
    
    
  }else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}