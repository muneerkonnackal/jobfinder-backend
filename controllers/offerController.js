const offers = require('../Models/offerSchema')


exports.addOffers = async (req, res) => {
    console.log('inside offer request');
    const userId = req.payload;
    console.log(userId);

    const offerImage = req.file.filename; 
    const {url,basicPlan,standardPlan, classicPlan} = req.body;
    console.log(`${offerImage},${url},${basicPlan},${standardPlan},${classicPlan}`);

    try {
               const newOffer = new offers({
                offerImage,
                url,
                basicPlan,
                standardPlan,
                classicPlan,
            });
            await newOffer.save();
            res.status(201).json(newOffer);
        console.log("newOffer:", newOffer);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
};

//:edit Superadmin offer
exports.editAdminOffers = async(req,res)=>{
    // const {id } = req.params;
   
    const userId = req.payload
    const {
        _id,
         offerImage,
        url,
        basicPlan,
        standardPlan,
        classicPlan} = req.body

    const exofferImage = req.file?req.file.filename:offerImage

    try{
            const updateOffer = await offers.findByIdAndUpdate({_id:_id},{offerImage: exofferImage, url,
                basicPlan,
                standardPlan,
                classicPlan},{new:true})

            // await updateAdmin.save()
            res.status(200).json(updateOffer)

    } catch(err){
            res.status(401).json(err)
    }
}
  //:get offer by users/candidates

  exports.getOffer = async(req,res)=>{
    userId = req.payload
    console.log(userId);
    try{
        const allOffers = await offers.findOne()
        res.status(200).json(allOffers)
  
    } catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
  
  }



  //:get offer by users/candidates

  exports.getAdminOffer = async(req,res)=>{
    userId = req.payload
    console.log(userId);
    try{
        const allAdOffers = await offers.findOne()
        res.status(200).json(allAdOffers)
  
    } catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
  
  }