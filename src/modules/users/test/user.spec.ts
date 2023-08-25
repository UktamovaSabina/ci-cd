import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
            imports: [PrismaModule]
        }).compile();


        usersService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);

    });
    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = ['test'];
            jest.spyOn(usersService, 'findAll').mockImplementation(async () => result).mockClear();

            expect(await usersController.findAll()).toBe(result);
        });
    });
    describe('findOne', () => {
        it('should return an object of user', async () => {
            const result = {test: true};
            jest.spyOn(usersService, 'findOne').mockImplementation(async () => result).mockClear();
            const params = 1;
            expect(await usersController.findOne(params)).toBe(result);
        });
    });

    describe('create', () => {
        it('should return an object of created user', async () => {
            const result = {
                name: "John",
                email: "John@gmail.com"
            };
            jest.spyOn(usersService, 'create').mockImplementation(async () => result).mockClear();
            const body = {
                name: "John",
                email: "John@gmail.com"
            };
            expect(await usersController.create(body)).toBe(result);
        });
    });

    describe('update', () => {
        it('should return an object of updated user', async () => {
            const result = {
                name: "John",
                email: "John@gmail.com"
            };
            jest.spyOn(usersService, 'update').mockImplementation(async () => result).mockClear();
            const param = "1";
            const body = {
                name: "John",
                email: "John@gmail.com"
            };
            expect(await usersController.update(param, body)).toBe(result);
        });
    });

    describe('delete', () => {
        it('should return an object of deleted user', async () => {
            const result = {
                name: "John",
                email: "John@gmail.com"
            };
            jest.spyOn(usersService, 'remove').mockImplementation(async () => result).mockClear();
            const param = 1;
            expect(await usersController.remove(param)).toBe(result);
        });
    });
})