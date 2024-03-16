const asyncHandler = (requestHandler)=>{
    (req, res, next)=>{
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((error) => next(error))
    }
}

export {asyncHandler}






// const asyncHandler = ()=>{}
// const asyncHandler = (function) => () =>{}
// const asyncHandler = (function) => async () =>{}




//by using the above syntax we can create a function that will take another function as an argument and then return a function that will be an async function.

// using try cath block in async function

// const asyncHandler = (fun) => async (req, res, next) =>{
//     try {
//         await fun(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             sucess: false,
//             message: error.message
//         })
//     }
// }