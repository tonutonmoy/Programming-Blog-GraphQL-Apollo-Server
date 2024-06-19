"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const client_1 = require("@prisma/client");
const jwtHelper_1 = require("./utils/jwtHelper");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
exports.prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            try {
                const userInfo = yield jwtHelper_1.jwtHelper.getUserInfoFromToken(req.headers.authorization);
                return {
                    prisma: exports.prisma,
                    userInfo,
                };
            }
            catch (error) {
                console.log(error);
            }
        }),
    });
    console.log(`🚀  Server ready at: ${url}`);
});
main();
