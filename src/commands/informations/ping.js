module.exports =  {
    name: "ping",
    description: "Pong!",

    run: async(client, interaction) => {
        await interaction.createMessage({
            content: "Pong!",
            flags: 64 // Ephemeral flag
        })
    }
}