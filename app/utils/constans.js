module.exports = {
    MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: Object.freeze({
        USER: "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER",
    }),
    PERMISSIONS: Object.freeze({
        USER: ["profile"],
        ADMIN: ["all"],
        SUPERADMIN: ["all"],
        CONTENT_MANAGER: ["course", "blog", "category", "product"],
        TEACHER: ["course", "blog"],
        SUPPLIER: ["product"],
        ALL: "all",
    }),
    ACCESS_TOKEN_SECRET_KEY: "CFE35BCE34E04571B5FA588280734FA60571EA52C0A318CA58B1CC5792744C02",
    REFRESH_TOKEN_SECRET_KET: "C5B194D66CB6A4E5BE7435388E093B6EFCA837871B5EECBBF387022198F1F2F4",
};
