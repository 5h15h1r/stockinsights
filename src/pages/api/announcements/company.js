import connectMongoDB from "../../../libs/db";
import Companies from "../../../model/companies";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectMongoDB();
    const { scripId, startDate, endDate, critical, recentAnnouncments } =
      req.query;
    const queryObject = {};
    
    try {
      if (scripId) {
        queryObject.SCRIP_CD = scripId.split(",");
      }

      if (startDate && endDate) {
        if (recentAnnouncments) {
          // const currentDate = new Date("2023-07-22"); use this for demonstration
          const currentDate = new Date();
          const end = currentDate.toISOString();
          const startDate = new Date(); //current Date
          startDate.setDate(currentDate.getDate() - 2);
          const start = startDate.toISOString();
          queryObject.NEWS_DT = { $gte: start, $lte: end };
          // console.log(end, start);
        } else {
          const start = new Date(startDate).toISOString();
          const end = new Date(endDate).toISOString();
          queryObject.NEWS_DT = { $gte: start, $lte: end };
        }
      }

      if (recentAnnouncments) {
        // const currentDate = new Date("2023-07-22"); use this for demonstration
        const currentDate = new Date();
        const end = currentDate.toISOString();
        const startDate = new Date(); //current Date
        startDate.setDate(currentDate.getDate() - 2);
        const start = startDate.toISOString();
        queryObject.NEWS_DT = { $gte: start, $lte: end };
        console.log(end, start);
      }

      if (critical) {
        queryObject.CRITICALNEWS = critical;
      }

      let result = Companies.find(queryObject);

      if (recentAnnouncments) {
        result.sort({
          NEWS_DT: -1,
        });
        // res.status(200).json({ nhBits: companies.length, companies });
      } else {
        result.sort({
          NEWS_DT: 1,
        });
        // res.status(200).json({ nhBits: companies.length, companies });
      }
      
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);

      const companies = await result;

      res.status(200).json({ nhBits: companies.length, companies });

      //catch error
    } catch (error) {
      console.error("error fetching", error);
      res.status(500).json({ error: "Error fetching ANNOUNCEMENT" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
