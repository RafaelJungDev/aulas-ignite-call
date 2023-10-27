"use client";

import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
// import { api } from "../../../lib/axios"
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { getServerSession } from "next-auth/next";
import { SessionProvider, signIn, useSession } from "next-auth/react";

import { globalStyles } from "@/app/styles/global";
import { useSearchParams } from "next/navigation";

globalStyles();

export default function ConnectCalendar() {
  const session = useSession();

  const searchParams = useSearchParams();

  const hasAuthError = searchParams.has("error");
  const isSignedId = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google");
  }

  console.log(session);

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedId ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedId}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
