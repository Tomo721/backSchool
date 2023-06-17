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
        if (project.dataCreated) {
            throw new Error('dataCreated изменять нельзя')
        }
        
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
        let projects; 

        let sortField = null
        let sortType = 1

        if (dto.sort) {
            sortField = dto.sort.field
            sortType = dto.sort.type === 'desc' ? -1 : 1
        }

        if (!dto.filter) {
            projects = await Project.find({}, excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {})
        } else {
            projects = await Project.find(
                {
                    $or: [
                        { name: dto.filter.name ? { $regex: dto.filter.name, $options: "i" } : '' },
                        { code: dto.filter.code ? { $regex: dto.filter.code, $options: "i" } : '' },
                    ]
                },
                excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {})
        }

        const projectAll = await Project.find()
        
        let total = Math.floor(projectAll.length / limit);

        if (projectAll.length % limit >= 1) {
            total++;
        };
        
        return { page, limit, total, projects }
        

    }
    async getProject(id) {

        if (!id) {
            throw new Error('id не указан')
        }
        const project = await Project.findById(id, excludeFilelds).exec()

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