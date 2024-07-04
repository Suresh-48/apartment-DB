import Block from "../models/blockModel.js";
import { getOne, getAll, deleteOne } from "../controllers/baseController.js";
import moment from "moment";

export async function createBlocks(req, res, next) {
  try {
    const { blockId, blockName, isActive, createdBy } = req.body;

    const existingBlock = await Block.findOne({ blockId: blockId });

    if (!blockId || !blockName) {
      const errors = {};
      if (!blockId) errors.blockId = "Block Id is required.";
      if (!blockName) errors.blockName = "Block Name is required.";
      return res.status(400).json({ error: "Validation Error", errors });
    }

    if (existingBlock) {
      return res.status(400).json({ error: "Block Id already exists." });
    } else {
      const date = Date.now();
      const createAt = moment(date).format("lll");
      const createData = await Block.create({
        blockId: blockId,
        blockName: blockName,
        isActive: false,
        createdBy: createdBy,
        createdAt: createAt,
      });

      res.status(201).json({
        status: true,
        data: createData,
        message: "Aparment Blocks Created Successfully",
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

export async function updateBlock(req, res, next) {
  try {
    const { blockId, blockName, isActive, createdBy } = req.body;

    // Find and update the block by blockId
    const updatedBlockData = await Block.findByIdAndUpdate(
      req.params.id,
      {
        blockName,
        isActive: isActive || false, // Set isActive to false if not provided
        createdBy,
        updatedAt: moment().format("lll"),
      },
      { new: true, runValidators: true }
    );

    // If block is updated, return success response
    if (updatedBlockData) {
      return res.status(200).json({
        status: true,
        data: updatedBlockData,
        message: "Apartment Block updated successfully.",
      });
    } else {
      // If blockId doesn't exist, return 404 not found
      return res.status(404).json({ error: "Block not found." });
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

export async function deleteApartmentBlocks(req, res, next) {
  try {
    const id = req.params.id;

    const blocksData = await Block.findById(id);

    if (!blocksData) {
      return res.status(404).json({ error: "Block Id not found." });
    } else {
      const deleteBlockData = await Block.findByIdAndDelete(id);
      return res.status(200).json({
        status: true,
        message: "Blocks Deleted Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function getOneBlock(req, res, next){
    try{
        const id = req.params.id;

        const blocksData = await Block.findById(id);
    
        if (!blocksData) {
          return res.status(404).json({ error: "Block Id not found." });
        } else {
          const getData = await Block.findById(id);
          return res.status(200).json({
            status: true,
            message: "Get Blocks Details Successfully",
            data: getData,
          });
        }
    }catch(err){
        next(err);
    }
}

export const getAllBlock = getAll(Block);
