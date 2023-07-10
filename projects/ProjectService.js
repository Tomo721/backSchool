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
        if (project.dateCreated) {
            throw new Error('dateCreated изменять нельзя')
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

        let filters = []

        if (dto.filter && dto.filter.name) {
            filters.push(
                { name: { $regex: dto.filter.name, $options: "i" } },
                { code: { $regex: dto.filter.name, $options: "i" } }
            )
        }
        
        if (filters.length === 0) {
            projects = await Project.find({}, excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {})
        } else {
            projects = await Project.find(
                {
                    $or: filters
                },
                excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {})
        }

        let projectAll = []

        if (filters.length !== 0) {
            projectAll = await Project.find({ $or: filters }, excludeFilelds)
        } else {
            projectAll = await Project.find()
        }
        
        let total = Math.floor(projectAll.length / limit);

        if (projectAll.length % limit >= 1) {
            total++;
        };
        
        return { page, limit, total, projects }
        

    }
    async getProject(id) {
        const project = await Project.findById(id, excludeFilelds).exec()

        if (project) {
            return project
        } else {
            return { message: 'Проекта с таким id не существует'}
        }
        
    }
    async deleteProject(id) {
        const project = await Project.findByIdAndDelete(id)
        return project

    }
}

export default new ProjectService()