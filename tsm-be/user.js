/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    let users = sequelize.define('users', {
        username: {
            field: 'username',
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstnameTH: {
            field: 'firstnameTH',
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        lastnameTH: {
            field: 'lastnameTH',
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        firstnameEN: {
            field: 'firstnameEN',
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        lastnameEN: {
            field: 'lastnameEN',
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        telephoneNumber: {
            field: 'telephoneNumber',
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        gender: {
            field: 'gender',
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        createdAt: {
            field: 'createdAt',
            type: DataTypes.DATE,
            allowNull: false,
            // defaultValue: ''
        },
        createdBy: {
            field: 'createdBy',
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        updatedAt: {
            field: 'updatedAt',
            type: DataTypes.DATE,
            allowNull: true,
            // defaultValue: ''
        },
        updatedBy: {
            field: 'updatedBy',
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        deletedAt: {
            field: 'deletedAt',
            type: DataTypes.DATE,
            allowNull: true,
            // defaultValue: ''
        },
        admin: {
            field: 'admin',
            type: DataTypes.BOOLEAN,
            allowNull: true,
            // defaultValue: ''
        }


    });
    users.associate = (models) => {
        models.users.hasMany( models.userMicroservices, { as: 'userMicroservices', foreignKey: 'username' });
        models.users.hasMany( models.userMicroserviceGroups, { as: 'userMicroserviceGroups', foreignKey: 'username' });
    };
    return users;
};
