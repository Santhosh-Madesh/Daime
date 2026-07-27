// domain/repositories/userRepository.js
//
// UserRepository contract:
//
// findAll() -> Promise<Array<{ id, name, email, createdAt, updatedAt }>>
//
// Any concrete implementation (MongoDB, in-memory, file, etc.)
// must provide a findAll method matching this signature.