// // cli.js
// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
// import { showDetails, showResults, cryptoHistory } from './app.js';

// yargs(hideBin(process.argv))
//   .usage('$0: Usage <command> [options]')
//   .command(
//     'search <currency>',
//     'Search query for a cryptocurrency',
//     (yargs) => {
//       yargs.positional('currency', {
//         describe: 'Name of the cryptocurrency',
//         type: 'string',
//       })
//       .option('c', {
//         alias: 'cache',
//         describe: 'Return cached results when available',
//         type: 'boolean',
//         default: false,
//       });
//     },
//     (args) => {
//       showResults(args.currency, args.cache);
//     }
//   )
//   .command(
//     'show <currency>',
//     'Show details for a cryptocurrency',
//     (yargs) => {
//       yargs.positional('currency', {
//         describe: 'Name of the cryptocurrency',
//         type: 'string',
//       })
//       .option('c', {
//         alias: 'cache',
//         describe: 'Return cached results when available',
//         type: 'boolean',
//         default: false,
//       });
//     },
//     (args) => {
//       showDetails(args.currency, args.cache);
//     }
//   )
//   .command(
//     'history',
//     'View previously selected cryptocurrencies',
//     () => {},
//     () => {
//       cryptoHistory();
//     }
//   )
//   .help().argv;
