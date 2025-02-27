/* eslint-disable jsdoc/require-jsdoc */
import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import { handleAbout } from "../modules/subcommands/rosalia/handleAbout";
import { handleDonate } from "../modules/subcommands/rosalia/handleDonate";
import { handleHelp } from "../modules/subcommands/rosalia/handleHelp";
import { handlePing } from "../modules/subcommands/rosalia/handlePing";
import { handleProfile } from "../modules/subcommands/rosalia/handleProfile";
import { errorEmbedGenerator } from "../utils/errorEmbedGenerator";
import { rosaErrorHandler } from "../utils/rosaErrorHandler";

export const rosalia: Command = {
  data: new SlashCommandBuilder()
    .setName("rosalia")
    .setDescription("Commands related to the bot itself.")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("ping")
        .setDescription("Returns Rosalia's response time.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("about")
        .setDescription("Returns information about the bot.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("profile")
        .setDescription("Provides a link to Rosalia's profile")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("donate")
        .setDescription("Provides a link to donate to the bot's development")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("help")
        .setDescription("Provides helpful links for using the bot.")
    ),
  run: async (Rosa, interaction) => {
    try {
      await interaction.deferReply();

      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case "ping":
          await handlePing(Rosa, interaction);
          break;
        case "about":
          await handleAbout(Rosa, interaction);
          break;
        case "profile":
          await handleProfile(Rosa, interaction);
          break;
        case "donate":
          await handleDonate(Rosa, interaction);
          break;
        case "help":
          await handleHelp(Rosa, interaction);
          break;
        default:
          await interaction.editReply({ content: "Invalid command!" });
      }
    } catch (err) {
      const errorId = await rosaErrorHandler(
        Rosa,
        "rosalia group command",
        err,
        interaction.guild?.name
      );

      await interaction.editReply({
        embeds: [errorEmbedGenerator(Rosa, "rosalia group", errorId)],
      });
    }
  },
};
