import moduleAlias from 'module-alias';

const src = `${__dirname}/`;
moduleAlias.addAliases({
    '@src': src,
    '@config': `${src}/config`,
    '@app': `${src}/app`,
    '@model': `${src}/app/Models`,
    '@database': `${src}/database`,
    '@routes': `${src}/routes`,
    '@contract': `${src}/contract`,
    '@constant': `${src}/constant`,
    '@bootstrap': `${src}/bootstrap`,
    '@core': `${src}/core`
});
