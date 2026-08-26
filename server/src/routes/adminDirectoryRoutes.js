import { Router } from 'express'
import { createFacility, createSpeciality, directoryOptions, getFacility, getSpeciality, listFacilities, listSpecialities, toggleSpeciality, updateFacility, updateSpeciality } from '../controllers/adminDirectoryController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()
router.use(requireAdmin)
router.get('/options', directoryOptions)
router.get('/facilities/:type', listFacilities)
router.post('/facilities/:type', createFacility)
router.get('/facilities/:type/:id', getFacility)
router.patch('/facilities/:type/:id', updateFacility)
router.get('/specialities', listSpecialities)
router.post('/specialities', createSpeciality)
router.get('/specialities/:id', getSpeciality)
router.patch('/specialities/:id', updateSpeciality)
router.patch('/specialities/:id/status', toggleSpeciality)
export default router
