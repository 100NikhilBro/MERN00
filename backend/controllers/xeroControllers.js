const Xero = require("../models/xeroModel");


exports.addData = async(req, res) => {
    try {

        const { name, body } = req.body;

        const data = new Xero({
            name: name,
            body: body,
        })

        const newXero = await data.save();

        res.send({
            newXero
        })

    } catch (e) {
        res.send({
            msg: "error"
        })
    }
}


exports.getData = async(req, res) => {
    try {
        const data = await Xero.find().sort({ createdAt: -1 });

        res.send({
            data,
        })
    } catch (e) {
        res.send({
            msg: "internal Error",
        })
    }

}



exports.deleteData = async(req, res) => {
    try {

        const { id } = req.params;

        const data = await Xero.findByIdAndDelete({ _id: id });

        console.log("Deleted Data ---> ", data)

    } catch (e) {
        console.log(e);
        res.send({
            msg: "Internal error"
        })
    }
}



exports.updateDate = async(req, res) => {
    try {

        const { name, body } = req.body;
        const { id } = req.params;

        const updateData = await Xero.findByIdAndUpdate({ _id: id }, {
            name: name,
            body: body,
        }, { new: true })

        res.send({
            updateData,
        })

    } catch (e) {
        console.log(e);

        res.send({
            msg: "Inernal error"
        })
    }
}



exports.updateStatus = async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // console.log(`Updating status for ID: ${id} with status: ${status}`);

        if (status === undefined) {
            return res.status(400).json({ msg: "Status is required" });
        }

        const updatedData = await Xero.findByIdAndUpdate(
            id, { $set: { status: status } }, { new: true },
        );

        if (!updatedData) {
            return res.status(404).json({ msg: "Data not found" });
        }

        res.json({
            msg: "Status updated successfully",
            data: updatedData,
        });

    } catch (e) {
        console.error(e);


        res.status(500).json({
            msg: "Internal Server Error",
            error: e.message || e,
        });
    }
}