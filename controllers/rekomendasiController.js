

exports.getAllRekomendasi = (req,res) => {
    res.status(200).json({
        status: 'success',
        data: {
            requestedAt: req.requestTime
        }
    })
}

exports.getRekomendasi = (req, res)=>{
    const tanggal = req.params.tanggal
    res.status(200).json({
        status: 'success',
        data: {
            tanggal : tanggal 
        }
    })
}