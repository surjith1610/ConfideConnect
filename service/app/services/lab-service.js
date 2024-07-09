import Lab from '../models/lab.js';

export const search = async (params = {}) => {
   const labsList =  await Lab.find(params).exec();
   return labsList;
}

export const save = async (labsData) => {
   const labs = new Lab(labsData);
   return await labs.save();
}

export const get = async (labId) => {
   const labsData = await Lab.findOne({labId: labId}).exec();
   return labsData;
}

export const deleteLab = async (labId) => {
   const deletedLab = await Lab.deleteOne({labId:labId});
   return deletedLab;
};

export const update = async (lab) => {
   const updatedLab = await Lab.updateOne({ labId: lab.labId }, lab).exec();
   return updatedLab;
}


export const deleteAllLab = async () => {
   return await Lab.deleteMany();
};
