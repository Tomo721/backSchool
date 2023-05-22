import Project from './Project.js';

const excludeFilelds = {
    __v: false,
}

class ProjectService {
    async createProject(project) {
        const createdProject = await Project.create(project)
        return createdProject;
    }
    async editeProject(project) {
        if (!project._id) {
            throw new Error('id не указан')
        }
        if (!project.dataEdited) {
            throw new Error('dataEdited не указан')
        }
        
        // после авторизации сделать проверку на автора ???

        const updatedProject = await Project.findByIdAndUpdate(project._id, project, { new: true })
        return updatedProject

    }
    async getProjects(dto, page, limit) {
        if (!dto.page) {
            page = 1
        } else {
            page = parseInt(dto.page)
        }

        if (!dto.limit) {
            limit = 10
        } else {
            limit = parseInt(dto.limit)
        }

        const skip = (page - 1) * 10

        const projects = await Project.find(
            {
                $or: [
                    { name: dto.filter.name ? { $regex: dto.filter.name, $options: "i" } : '' },
                    { code: dto.filter.code ? { $regex: dto.filter.code, $options: "i" } : '' },
                ]
            } , 
            excludeFilelds).skip(skip).limit(limit)

        
        return { page, limit, projects }
        

    }
    async getProject(id) {

        if (!id) {
            throw new Error('id не указан')
        }
        const project = await Project.findById({}, excludeFilelds).exec()

        return project
    }
    async deleteProject(id) {
        if (!id) {
            throw new Error('id не указан')
        }
        const project = await Project.findByIdAndDelete(id)
        return project

    }
}

export default new ProjectService()