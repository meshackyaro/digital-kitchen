import { fetchFoodService, 
    fetchFoodByIdService, 
    createFoodService, 
    updateFoodService, 
    deleteFoodService } from "../services/food.services.js";

export const fetchFoodController = async (req, res) => {
    const food = await fetchFoodService();
    
    res.status(200).json({
        status: "SUCCESS",
        message: "Food fetched successfully",
        data: food,
    });
};

export const fetchFoodByIdController = async (req, res) => {
    const { foodId } = req.params;
    const food = await fetchFoodByIdService(foodId);
    
    res.status(200).json({
        status: "SUCCESS",
        message: "Food fetched successfully",
        data: food,
    });
};

export const createFoodController = async (req, res) => {
    const food = await createFoodService(req.body);
    
    res.status(200).json({
        status: "SUCCESS",
        message: "Food created successfully",
        data: food,
    });
};

export const updateFoodController = async (req, res) => {
    const { foodId } = req.params;
    const food = await updateFoodService(foodId, req.body);
    
    res.status(200).json({
        status: "SUCCESS",
        message: "Food updated successfully",
        data: food,
    });
};

export const deleteFoodController = async (req, res) => {
    const { foodId } = req.params;
    const food = await deleteFoodService(foodId);
    
    res.status(200).json({
        status: "SUCCESS",
        message: "Food deleted successfully",
        data: food,
    });
};
