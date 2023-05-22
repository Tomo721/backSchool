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
    async getProjects(page, limit) {
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        const skip = (page - 1) * 10
        const projects = await Project.find({}, excludeFilelds).skip(skip).limit(limit)
        return { page, limit, projects }
    }
    async getProject(name) {
        
        if (!name) {
            throw new Error('name не указан')
        }
        const project = await Project.findOne({ "name": name }, excludeFilelds).exec()

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