const client = require("../db");

exports.getAllRekomendasi = async (req,res) => {
    try {
        const query = "SELECT * FROM rekomendasi;";
        const result = await client.query(query);
        const rows = result.rows;
    
        // Send the rows as a JSON response
        res.status(200).json({
          status: "success",
          data: {
            requestedAt: req.requestTime,
            data: rows, // Store the rows in the 'rows' property of the response
          },
        });
    
        // If you want to log the rows as well
        // rows.forEach((row) => {
        //   console.log(`Read: ${JSON.stringify(row)}`);
        // });
      } catch (err) {
        console.log(err);
    
        // Handle the error and send an error response if needed
        res.status(500).json({
          status: "error",
          message: "An error occurred while fetching data.",
        });
      }
    };

exports.getRekomendasi = (req, res)=>{
    const tanggal = req.params.tanggal
    res.status(200).json({
        status: 'success',
        data: {
            tanggal : tanggal 
        }
    })
}