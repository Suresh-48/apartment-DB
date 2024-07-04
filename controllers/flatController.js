import Flat from "../models/flatModal.js";

export async function createFlat(req, res, next){
    try {
        const data = req.body;
    
        const existingFlat = await Flat.findOne({ flatId: data.flatId });

        const missingFields = [];

        const requiredFields = ["flatId", "blockId", "flatName", "createdBy"];

        for (const field of requiredFields) {
            if (!data[field]) {
              missingFields.push(field);
            }
          }
      
          if (missingFields.length > 0) {
            return res.status(422).json({
              status: false,
              message: `${missingFields} is required fields`,
            });
          }
    
        if (existingFlat) {
          return res.status(400).json({ error: "Flat Id already exists." });
        } else {
          const date = Date.now();
          const createAt = moment(date).format("lll");
          const createData = await Flat.create({
            flatId: data.flatId,
            blockId: data.blockId,
            flatName: data.flatName,
            isActive: false,
            createdBy: data.createdBy,
            createdAt: createAt,
          });
    
          res.status(201).json({
            status: true,
            data: createData,
            message: "Flat Created Successfully",
          });
        }
      } catch (error) {
        if (error.name === "ValidationError") {
          const validationErrors = {};
          for (const field in error.errors) {
            validationErrors[field] = error.errors[field].message;
          }
          const firstValidationErrorField = Object.keys(validationErrors)[0];
          const errorMessage = validationErrors[firstValidationErrorField];
    
          return res.status(422).json({
            status: false,
            message: errorMessage,
          });
        }
        next(err);
      }
}

export async function updateFlat(req, res, next) {
    try {
    const data = req.body;

    const date = Date.now();
    const updateAt = moment(date).format("lll");

    const missingFields = [];

    const requiredFields = ["flatId"];

    for (const field of requiredFields) {
      if (!data[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(422).json({
        status: false,
        message: `${missingFields} is required fields`,
      });
    }
    if(!data.flatId) {
        // If blockId doesn't exist, return 404 not found
        return res.status(404).json({ error: "Flat not found." });
      }else{
        const editData = {
            flatId: data.flatId,
                blockId: data.blockId,
                flatName: data.flatName,
                isActive: false,
                updateAt: updateAt,
          };
    
          const updatedFlatData = await Flat.findByIdAndUpdate(data.flatId, editData, {
            new: true,
            runValidators: true,
          });
      
          res.status(200).json({
            status: true,
            message: "Flat Updated Successfully",
            data: updatedFlatData,
          });
        }
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        const validationErrors = {};
        for (const field in error.errors) {
          validationErrors[field] = error.errors[field].message;
        }
        return res.status(422).json({
          status: false,
          message: "Validation Error",
          errors: validationErrors,
        });
      }
      // Pass other errors to the error handling middleware
      next(error);
    }
  }
  
  export async function deleteApartmentFlat(req, res, next) {
    try {
      const id = req.params.id;
  
      const flatData = await Flat.findById(id);
  
      if (!flatData) {
        return res.status(404).json({ error: "Flat Id not found." });
      } else {
        const deleteFlatData = await Flat.findByIdAndDelete(id);
        return res.status(200).json({
          status: true,
          message: "Aparment Flat Deleted Successfully",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  
  export async function getOneFlat(req, res, next){
      try{
          const id = req.params.id;
  
          const flatData = await Flat.findById(id);
      
          if (!flatData) {
            return res.status(404).json({ error: "Flat Id not found." });
          } else {
            const getData = await Flat.findById(id);
            return res.status(200).json({
              status: true,
              message: "Get Flats Details Successfully",
              data: getData,
            });
          }
      }catch(err){
          next(err);
      }
  }
  
  export const getAllFlat = getAll(Flat);