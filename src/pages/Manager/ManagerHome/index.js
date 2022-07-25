import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import {
    makeStyles, Grid, Card, CardActionArea, CardContent,
    CardMedia, Typography
} from '@material-ui/core'

import produtor from '../../../assets/images/produtor.jpg'
import produto from '../../../assets/images/produto.jpg'
import atividade from '../../../assets/images/atividade.jpg'
import vendas from '../../../assets/images/vendas.jpg'
import tarefas from '../../../assets/images/tarefas.jpg'
import perfil from '../../../assets/images/meuperfil.jpg'
import site from '../../../assets/images/site.jpg'  

import { AuthContext } from '../../../contexts/AuthContext'

const ManagerHome = () => {

    const classes = useStyles()
    const { user } = useContext(AuthContext)

    return (
        <Grid container spacing={2}>
            <Grid component={Link} to={'/producer-list'} className={classes.grid} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={produtor}
                            title="Produtor"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Produtor
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Realize o cadastro de produtores, consultas e toda parte de gerenciamento
                                que envolve o produtor.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid component={Link} to={'/product-list'} className={classes.grid} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={produto}
                            title="Produto"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Produto
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Cadastre os produtos previamente para que sejam listados no
                                cadastramento de produtores.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid component={Link} to={'/activity-list'} className={classes.grid} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={atividade}
                            title="Atividade"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Atividade
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Aqui ficam as atividades executadas pelos produtores, é
                                importante que elas sejam cadastradas com antecedência.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid component={Link} to={'/sales'} className={classes.grid} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={vendas}
                            title="Vendas"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Vendas
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Consulte o histórico das vendas separadas por período, assim
                                como o balance das atividades dos produtores.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid component={Link} to={'/tasks'} className={classes.grid} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={tarefas}
                            title="Tarefas"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Tarefas
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Cria agendamento para terefas futuras e verifique o que
                                há de importante já agendado.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid component={Link} to={`/my-profile/${user?.id}/${user?.role}`} className={classes.grid} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={perfil}
                            title="Meu Perfil"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Meu Perfil
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Mantenha seus dados atualizados e realize alterações
                                cadastrais caso precise.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid component={Link} to={`/site-list/${user?.id}/${user?.role}`} className={classes.grid} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={site}
                            title="Sítios"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Sítios
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Cadastre os sítios que serão monitorados.
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
}

export default ManagerHome

const useStyles = makeStyles({
    grid: {
        textDecoration: 'none',
    },
    root: {
        '&:hover': {
            background: 'rgb(0,0,0,0.05)'
        },
    },
    media: {
        height: 75,
    },
});
