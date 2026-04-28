export const successResponse=(res:any,message:string,data:any,status=200)=>{
    return res.status(status).json({
        success:true,
        message,
        data,
    });
};
export const errorResponse=(res:any,message:string,error:any,status=500)=>{
    return res.status(status).json({
        success:false,
        message,
        error
    });
};
