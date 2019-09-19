export const graylog = {
    prelog(msg) {
      return msg.trim();
    },
    servers: [{ host: 'graylog.mauricioschmitz.com.br', port: 12201 }],
    facility: 'CursoNodeJS',
    staticMeta: { env: 'development' },
};