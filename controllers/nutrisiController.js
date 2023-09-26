exports.getAllNutrisi = (req,res) => {
    res.status(200).json({
        status: 'success',
        data: {
            requestedAt: req.requestTime
        }
    })
}

exports.postNutrisi = (req, res) =>{
    const dataNutrisi = Object.assign({tanggal: req.requestTime}, req.body)
    res.status(200).json({
        status:'success',
        data:{
            nutrisi: dataNutrisi
        }
    })
}

exports.getNutrisi = (req, res)=>{
    const tanggal = req.params.tanggal
    res.status(200).json({
        status: 'success',
        data: {
            tanggal : tanggal 
        }
    })
}