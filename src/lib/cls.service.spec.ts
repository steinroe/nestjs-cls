import { Test, TestingModule } from '@nestjs/testing';
import { ClsServiceManager, CLS_DEFAULT_NAMESPACE } from '..';
import { ClsService } from './cls.service';

describe('ClsService', () => {
    let service: ClsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ClsService,
                    useValue: ClsServiceManager.addClsService(
                        CLS_DEFAULT_NAMESPACE,
                    ),
                },
            ],
        }).compile();

        service = module.get<ClsService>(ClsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should set and retrieve the context', () => {
        service.run(() => {
            service.set('key', 123);
            expect(service.get('key')).toEqual(123);
        });
    });
    it('should not retireve context in a different call', () => {
        service.run(() => {
            service.set('key', 123);
        });
        service.run(() => {
            expect(service.get('key')).not.toEqual(123);
        });
    });
});
