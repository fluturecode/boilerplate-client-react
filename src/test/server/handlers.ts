import { User } from 'common/models';
import { AgencyFactory, RoleFactory, UserFactory } from 'common/models/testing-factories';
import { environment } from 'environment';
import { StatusCodes } from 'http-status-codes';
import { rest } from 'msw';

export const baseUrl = environment.apiRoute;

export const handlers = [
  // Agency endpoints
  rest.get(`${baseUrl}/agencies`, (req, res, ctx) => {
    return res(
      ctx.status(StatusCodes.OK),
      ctx.json([AgencyFactory.build({ agencyName: 'Main' }), AgencyFactory.build({ agencyName: 'Public' })]),
    );
  }),

  // Role endpoints
  rest.get(`${baseUrl}/roles`, (req, res, ctx) => {
    return res(
      ctx.status(StatusCodes.OK),
      ctx.json([
        RoleFactory.build({ roleName: 'Super Administrator' }),
        RoleFactory.build({ roleName: 'Admin' }),
        RoleFactory.build({ roleName: 'Editor' }),
        RoleFactory.build({ roleName: 'User' }),
      ]),
    );
  }),

  // User endpoints
  rest.post(`${baseUrl}/users`, (req, res, ctx) => {
    const newUser = UserFactory.build({ ...(req.body as Partial<User>) });
    return res(ctx.status(StatusCodes.CREATED), ctx.json(newUser));
  }),
  
  rest.post(`${baseUrl}/users/forgot-password`, (req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK))
  })
];

