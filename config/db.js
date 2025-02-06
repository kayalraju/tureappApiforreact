const mongoose= require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://subhomoychatterjee155:dmbmOKYOMF1CFyXd@cluster0.c5daa.mongodb.net/tureapp');
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

module.exports= connectDB