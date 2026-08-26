import { Router } from 'express'
import { createAdminDoctor, doctorOptions, getAdminDoctor, listAdminDoctors, toggleAdminDoctor, updateAdminDoctor, uploadAdminDoctorImage } from '../controllers/adminDoctorController.js'
import { doctorImageUpload } from '../middleware/doctorImageUpload.js'
import requireAdmin from '../middleware/requireAdmin.js'
const router = Router(); router.use(requireAdmin); router.get('/options', doctorOptions); router.get('/', listAdminDoctors); router.post('/', createAdminDoctor); router.get('/:id', getAdminDoctor); router.patch('/:id', updateAdminDoctor); router.post('/:id/image', doctorImageUpload.single('image'), uploadAdminDoctorImage); router.patch('/:id/status', toggleAdminDoctor); export default router
