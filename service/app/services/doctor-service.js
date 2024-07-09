import Doctors from '../models/doctor.js';

export const search = async (params = {}) => {
   const doctorsList =  await Doctors.find(params).exec();
   return doctorsList;
}

export const save = async (doctorsData) => {
   const doctors = new Doctors(doctorsData);
   return await doctors.save();
}

export const get = async (doctorId) => {
   const doctorsData = await Doctors.findOne({doctorId: doctorId}).exec();
   return doctorsData;
}

export const deleteDoctor = async (doctorId) => {
   const deleteddoctor = await Doctors.deleteOne({doctorId:doctorId});
   return deleteddoctor;
};

export const update = async (doctor) => {
   const updatedDoctor = await Doctors.updateOne({ doctorId: doctor.doctorId }, doctor).exec();
   return updatedDoctor;
}


export const deleteAllDoctors = async () => {
   const doctors = await Doctors.deleteMany()
   return doctors;
};
