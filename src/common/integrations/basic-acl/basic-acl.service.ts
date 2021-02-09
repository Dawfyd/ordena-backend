import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import appConfig from '../../../config/app.config';

@Injectable()
export class BasicAclService {
  constructor(
        @Inject(appConfig.KEY)
        private readonly appConfiguration: ConfigType<typeof appConfig>,
  ){}

  async getToken(): Promise<string> {
    const {
      acl: { baseUrl, companyUuid, email, password}
    } = this.appConfiguration;

    const response = await axios({
      url: `${baseUrl}users/login-admin`,
      method: 'post',
      data: {
        companyUuid,
        email,
        password
      }
    });

    const { data } = response;
    const { accessToken } = data;
    return accessToken;
  }

  async findUser (authUid: string) {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}users/user/${authUid}`,
        method: 'get',
        headers: {
          'company-uuid': companyUuid,
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async createUser (email: string, password: string, phone: string, roleCode: string) {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}users`,
        method: 'post',
        headers: {
          'company-uuid': companyUuid,
          Authorization: `Bearer ${token}`
        },
        data: {
          companyUuid,
          email,
          password,
          phone,
          roleCode
        }
      });
      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async updateUser (id: number, email: string) {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}users/${companyUuid}/${id}`,
        method: 'patch',
        headers: {
          'company-uuid': companyUuid,
          Authorization: `Bearer ${token}`
        },
        data: {
          email
        }
      });
      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async removeUser (id: number) {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}users/${companyUuid}/${id}`,
        method: 'delete',
        headers: {
          'company-uuid': companyUuid,
          Authorization: `Bearer ${token}`
        }
      });

      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async sendForgottenPasswordEmail (email: string) {
    try {
      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}users/forgotten-password`,
        method: 'post',
        data: {
          companyUuid,
          email
        }
      });

      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async changePassword (email: string, oldPassword: string , newPassword: string) {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}users/change-password`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'company-uuid': companyUuid
        },
        data: {
          companyUuid,
          email,
          oldPassword,
          newPassword
        }
      });

      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async checkPermission (token: string, requestedRoute: string, requestedMethod: string) {
    try {

      const {
        acl: { baseUrl, companyUuid, projectCode}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}permissions/check`,
        method: 'post',
        data: {
          companyUuid,
          projectCode,
          token,
          requestedRoute,
          requestedMethod
        }
      });

      const { data } = response;
      const { allowed, reason } = data;
      return { allowed, reason };
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async changePhone (email: string, phone: string) {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid }
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}users/change-phone`,
        method: 'patch',
        headers: {
          Authorization: `Bearer ${token}`,
          'company-uuid': companyUuid
        },
        data: {
          companyUuid,
          email,
          phone
        }
      });

      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async createRole (name: string, code: string) {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}roles`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'company-uuid': companyUuid
        },
        data: {
          companyUuid,
          name,
          code
        }
      });

      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }

  async findAllRoles () {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid}
      } = this.appConfiguration;

      const response = await axios({
        url: `${baseUrl}roles/${companyUuid}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'company-uuid': companyUuid
        }
      });

      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }
}
