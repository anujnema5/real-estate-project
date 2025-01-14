import { db } from "@/db";
import { CustomError } from "@/utils/responses/ApiError";
import { ApiResponse } from "@/utils/responses/ApiResponse";
import { UserRequest } from "@/utils/types/types";
import { Request, Response } from "express";

export const createBooking = async (req: UserRequest, res: Response) => {
    const userID = req.user.id;
    const { vendorId } = req.body || req.query.vendorId;

    const bookingDetails = req.body;
    const newBooking = await db.booking.create({ data: {...bookingDetails, vendorId, userID} })

    if (!newBooking) {
        throw new CustomError(400, 'Error while creating booking')
    }

    return res.status(200).json(new ApiResponse(200, newBooking, 'Booking created successfully'))
}

export const getBooking = async (req: UserRequest, res: Response)=> {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;
    const booking = await db.booking.findUnique({where: {userId, id: bookingId}});

    if(!booking) {
        throw new CustomError(404, `No Booking found`)
    }
    
    return res.status(200).json(new ApiResponse(200, booking))
}

export const getBookings = async (req: UserRequest, res: Response)=> {
    const userId = req.user.id;
    const bookings = await db.booking.findMany({where: {userId}})

    return res.status(200).json
}