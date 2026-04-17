export const successResponse=(res:any,message:any,data:any,status=200)=>{
    return res.status(status).json({
        success:true,
        message,
        data,
    });
};
export const errorResponse=(res:any,message:any,error:any,status=500)=>{
    return res.status(status).json({
        success:false,
        message,
        error
    });
};
