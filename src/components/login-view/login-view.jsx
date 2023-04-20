
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required   
        />
      </label>
      <label>
        Password:
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};