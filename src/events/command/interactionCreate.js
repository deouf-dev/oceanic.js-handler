module.exports = {
    name: "interactionCreate",

    run: async(client, interaction) => {
        if(interaction.type !== 2) return;
        const command = client.commands.get(interaction.data.name);

        if(!command) return;
        command.run(client, interaction);
    }
}