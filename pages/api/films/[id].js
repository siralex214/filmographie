import Films from "../../../models/Films";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

const requeteId = async (req, res) => {
    const {
        query: {id},
        method
    } = req;

    switch (method) {
        case "GET":
            try {
                const film = await Films.findById(id)

                if (!film) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: film})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const film = await Films.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })
                if (!film) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: film})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE' :
            try {
                const deletedFilm = await Films.deleteOne({_id: id})

                if (!deletedFilm) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: {}})

            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break
    }
}
export default requeteId