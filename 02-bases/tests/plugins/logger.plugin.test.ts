import { buildLogger, logger, logger as winstonLogger } from "../../src/plugins/logger.plugin";

describe('plugins/logger.plugin.ts', () => {

    test('buildLogger should return a function logger', () => {

        const log = buildLogger('test');

        expect(typeof log.log).toBe('function');
        expect(typeof log.error).toBe('function');
    });

    test('logger.log should log a message', () => {
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');
        const message = 'test message';
        const service = 'test service';

        const log = buildLogger(service);
        log.log(message);

        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                level: 'info',
                message,
                service
            })
        );
    });

});
